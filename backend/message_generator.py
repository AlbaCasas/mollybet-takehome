import asyncio
import random
from fastapi import FastAPI, WebSocket
from fastapi.logger import logger
from starlette.websockets import WebSocketState
from datetime import timedelta, date
from math import floor
from models import Match, Club

DAY_DURATION = 0.1
DISCONNECT_RATE = 0.00
CODE_ERROR_RATE = 0.01
CHAMPIONS_LEAGUE_RATE = 0.05


class MessageGenerator:
    websockets: list[WebSocket]
    matches: list[Match]
    clubs: dict[str, Club]

    current_date: str

    def __init__(self, app: FastAPI) -> None:
        self.matches = [Match.parse_obj(match) for match in app.matches]
        self.clubs = {club["name"]: club for club in app.clubs}
        self.websockets = []
        self.current_date = self.matches[0].date

    async def add_connection(self, websocket: WebSocket) -> None:
        self.websockets.append(websocket)

    async def remove_connection(self, websocket: WebSocket) -> None:
        if websocket and websocket.client_state != WebSocketState.DISCONNECTED:
            logger.info("Closing websocket ...")
            await websocket.close()

        try:
            del self.websockets[self.websockets.index(websocket)]
        except:
            pass

    async def start(self) -> None:
        while True:
            try:
                websockets_to_remove = []
                for index, websocket in enumerate(self.websockets):
                    # Remove dead websockets
                    if (
                        websocket.client_state
                        not in (WebSocketState.CONNECTING, WebSocketState.CONNECTED)
                        and index not in websockets_to_remove
                    ):
                        websockets_to_remove.append(index)
                        continue

                    # Randomly close websockets
                    if (
                        random.random() < DISCONNECT_RATE
                        and index not in websockets_to_remove
                    ):
                        await self.remove_connection(websocket)
                        websockets_to_remove.append(index)
                        continue

                for index in websockets_to_remove:
                    self.remove_connection(self.websockets[index])

                # Check we have websockets to send the information to
                if not len(self.websockets):
                    await asyncio.sleep(1)
                    continue

                # Get todays matches
                matches = [
                    dict(match)
                    for match in self.matches
                    if match.date == self.current_date
                ]

                # Randomly add in champions league matches
                if random.random() < CHAMPIONS_LEAGUE_RATE:
                    matches.append(
                        {
                            "round": "Group Stages",
                            "competition": "Champions League",
                            "date": self.current_date,
                            "home": list(self.clubs.values())[
                                floor(random.random() * len(self.clubs.values()))
                            ]["name"],
                            "away": ["Barcelona", "FC Bayern Munich", "Dubrava"][
                                floor(3 * random.random())
                            ],
                            "score": {
                                "ft": [
                                    floor(10 * random.random()),
                                    floor(10 * random.random()),
                                ]
                            },
                        }
                    )

                for match in matches:
                    match["home"] = self.clubs[match["home"]]["code"]
                    match["away"] = self.clubs[match["away"]]["code"]
                    # Randomly lowercase team codes
                    if random.random() < CODE_ERROR_RATE:
                        match["home"] = match["home"].lower()
                    if random.random() < CODE_ERROR_RATE:
                        match["away"] = match["away"].lower()

                if len(matches):
                    matches = matches if len(matches) > 1 else matches[0]

                    for websocket in self.websockets:
                        await websocket.send_json(matches)

                await asyncio.sleep(DAY_DURATION)

                self.current_date = (
                    date.fromisoformat(self.current_date) + timedelta(days=1)
                ).isoformat()

                # Handle end of season

                if self.current_date > self.matches[-1].date:
                    await websocket.send_text("season finished")
                    for websocket in self.websockets.copy():
                        await self.remove_connection(websocket)

                    self.current_date = (
                        date.fromisoformat(self.matches[0].date) - timedelta(days=2)
                    ).isoformat()
            except Exception as error:
                logger.error(error)
                break

/** @format */

export class WebSocketClient<T = unknown> {
  private ws: WebSocket | null = null;
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  connect(): void {
    console.log(`Connecting to WebSocket: ${this.url}`);
    this.ws = new WebSocket(this.url);
    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    if (!this.ws) return;

    this.ws.onopen = () => {
      console.log('WebSocket connection opened');
      this.onOpen?.();
    };

    this.ws.onmessage = (event) => {
      try {
        console.log('WebSocket message received:', event.data);
        const data = JSON.parse(event.data) as T;
        this.onMessage?.(data);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
        this.onError?.('Failed to parse message');
      }
    };

    this.ws.onclose = (event) => {
      console.log(`WebSocket connection closed. Code: ${event.code}, Reason: ${event.reason}`);
      this.onClose?.();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.onError?.('WebSocket error');
    };
  }

  disconnect(): void {
    if (this.ws) {
      console.log('Disconnecting WebSocket');
      this.ws.close();
      this.ws = null;
    }
  }

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  onMessage?: (data: T) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: string) => void;
}

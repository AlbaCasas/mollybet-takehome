/** @format */

import React from 'react';
import { Label } from '../../../components/Label';
import {
  Table,
  TableHeader,
  TableBody,
  TableTH,
  TableTD,
  TableRow,
} from '../../../components/Table';
import { cn } from '../../../core/styles/utils';
import { Standing } from '../domain/Standing';
import { Badge } from '../../../components/Badge';

export const LeagueTable = ({
  tableRows,
  className,
  onRowClick,
}: {
  tableRows: Standing[];
  className?: string;
  onRowClick: (clubCode: string) => void;
}) => {
  const getPositionIndicatorColor = (position: number): string => {
    if (position <= 3) return 'bg-green-500';
    if (position >= tableRows.length - 2) return 'bg-red-500';
    return 'bg-transparent';
  };

  const COLS = 10;

  return (
    <div className={className}>
      <div className="overflow-hidden rounded-lg border border-surface-border bg-white">
        <Table>
          <TableHeader>
            <TableTH align="left" text="Pos" />
            <TableTH align="left" text="Club" />
            <TableTH text="P" />
            <TableTH text="W" />
            <TableTH text="D" />
            <TableTH text="L" />
            <TableTH text="GF" />
            <TableTH text="GA" />
            <TableTH text="GD" />
            <TableTH text="Pts" />
          </TableHeader>

          {tableRows.length === 0 ? (
            <TableBody>
              <tr>
                <TableTD colSpan={COLS} className="px-4 py-8 text-center">
                  <Label variant="body" className="text-on-muted">
                    Error fetching clubs. Please try again later.
                  </Label>
                </TableTD>
              </tr>
            </TableBody>
          ) : (
            <TableBody>
              {tableRows.map((row, index) => {
                const isEven = index % 2 === 0;
                const standingPosition = index + 1;
                return (
                  <TableRow
                    key={row.clubCode}
                    className={cn(isEven ? 'bg-surface' : 'bg-white')}
                    onClick={() => onRowClick(row.clubCode)}
                  >
                    <TableTD align="left">
                      <div
                        className={`absolute left-0 top-0 h-full w-1 ${getPositionIndicatorColor(standingPosition)}`}
                      />
                      <Label variant="caption" className="mx-4 my-3">
                        {standingPosition}
                      </Label>
                    </TableTD>

                    <TableTD align="left">
                      <div className="flex items-center px-4 py-3 gap-3">
                        <Badge variant="defaultSmall" className="w-[40px]">
                          {row.clubCode}
                        </Badge>
                        <Label variant="body" className="font-medium">
                          {row.clubName}
                        </Label>
                      </div>
                    </TableTD>

                    <TableTD text={row.played.toString()} />
                    <TableTD text={row.won.toString()} />
                    <TableTD text={row.drawn.toString()} />
                    <TableTD text={row.lost.toString()} />
                    <TableTD text={row.goalsFor.toString()} />
                    <TableTD text={row.goalsAgainst.toString()} />
                    <TableTD text={row.goalDifferenceText} />
                    <TableTD text={row.points.toString()} />
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
};

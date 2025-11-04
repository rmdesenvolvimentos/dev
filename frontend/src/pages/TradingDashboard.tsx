import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, ServerCrash, Trophy, BarChart3 } from 'lucide-react';
import { TradingLayout } from '@/components/layout/TradingLayout';
import { fetchRanking, fetchOperations, RankingEntry, Operation } from '@/api/championshipApi';
import { Badge } from '@/components/ui/badge';

/**
 * Renders a table displaying the championship ranking.
 * @param {{ data: RankingEntry[] }} props The component props.
 * @param {RankingEntry[]} props.data The array of ranking data to display.
 * @returns {JSX.Element} A table component.
 */
const RankingTable: React.FC<{ data: RankingEntry[] }> = ({ data }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">Rank</TableHead>
        <TableHead>Trader</TableHead>
        <TableHead className="text-right">Total Profit</TableHead>
        <TableHead className="text-right">Operations</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((trader, index) => (
        <TableRow key={trader.user__username}>
          <TableCell className="font-medium text-center">{index + 1}</TableCell>
          <TableCell>{trader.nickname}</TableCell>
          <TableCell className={`text-right font-semibold ${parseFloat(String(trader.total_profit)) >= 0 ? 'text-success' : 'text-danger'}`}>
            ${Number(trader.total_profit).toFixed(2)}
          </TableCell>
          <TableCell className="text-right">{trader.operation_count}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

/**
 * Renders a table displaying the user's trading operation history.
 * @param {{ data: Operation[] }} props The component props.
 * @param {Operation[]} props.data The array of operation data to display.
 * @returns {JSX.Element} A table component.
 */
const OperationsHistory: React.FC<{ data: Operation[] }> = ({ data }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Symbol</TableHead>
        <TableHead>Type</TableHead>
        <TableHead className="text-right">Volume</TableHead>
        <TableHead className="text-right">Profit</TableHead>
        <TableHead>Close Time</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((op) => (
        <TableRow key={op.id}>
          <TableCell className="font-medium">{op.symbol}</TableCell>
          <TableCell>
            <Badge variant={op.type === 'BUY' ? 'default' : 'secondary'}>
              {op.type}
            </Badge>
          </TableCell>
          <TableCell className="text-right">{Number(op.volume).toFixed(2)}</TableCell>
          <TableCell className={`text-right font-semibold ${parseFloat(op.profit) >= 0 ? 'text-success' : 'text-danger'}`}>
            {parseFloat(op.profit) >= 0 ? '+' : ''}${Number(op.profit).toFixed(2)}
          </TableCell>
          <TableCell>{new Date(op.close_time).toLocaleString()}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

/**
 * A generic wrapper component for handling TanStack Query states.
 *
 * This component abstracts the boilerplate of checking for `isLoading` and
 * `isError` states from a `useQuery` hook. It displays a loading spinner,
 * an error message, or the successfully fetched data, which is passed to a
 * render prop `children`.
 *
 * @template T The expected type of the data being fetched.
 * @param {object} props The component props.
 * @param {string[]} props.queryKey The key for the query, used for caching.
 * @param {() => Promise<T>} props.queryFn The async function that fetches the data.
 * @param {(data: T) => React.ReactNode} props.children A render prop function that receives the data and returns the content to display.
 * @param {string} props.title The title to display in the card header.
 * @param {React.ElementType} props.Icon The icon component to display next to the title.
 * @returns {JSX.Element} A card component containing the loading state, error state, or rendered children.
 */
const QueryWrapper = <T,>({
  queryKey,
  queryFn,
  children,
  title,
  Icon
}: {
  queryKey: string[],
  queryFn: () => Promise<T>,
  children: (data: T) => React.ReactNode,
  title: string,
  Icon: React.ElementType
}) => {
  const { data, isLoading, isError, error } = useQuery<T>({ queryKey, queryFn });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="w-5 h-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}
        {isError && (
          <Alert variant="destructive">
            <ServerCrash className="h-4 w-4" />
            <AlertTitle>Error Fetching Data</AlertTitle>
            <AlertDescription>{error instanceof Error ? error.message : 'An unknown error occurred'}</AlertDescription>
          </Alert>
        )}
        {data && children(data)}
      </CardContent>
    </Card>
  );
};

/**
 * The main dashboard page for authenticated users.
 *
 * This page displays the core information for the trading championship, including
 * the public ranking and the authenticated user's personal trading history.
 * It uses the generic `QueryWrapper` component to handle data fetching,
 * loading, and error states for each section.
 *
 * @returns {JSX.Element} The rendered trading dashboard page.
 */
export default function TradingDashboard() {
  return (
    <TradingLayout title="Championship Dashboard">
      <div className="container mx-auto p-4 space-y-6">

        <QueryWrapper
          queryKey={['ranking']}
          queryFn={fetchRanking}
          title="Ranking"
          Icon={Trophy}
        >
          {(data) => <RankingTable data={data as RankingEntry[]} />}
        </QueryWrapper>

        <QueryWrapper
          queryKey={['operations']}
          queryFn={() => fetchOperations()}
          title="Operations History"
          Icon={BarChart3}
        >
          {(data) => <OperationsHistory data={data as Operation[]} />}
        </QueryWrapper>

      </div>
    </TradingLayout>
  );
}
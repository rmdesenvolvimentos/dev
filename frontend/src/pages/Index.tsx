
import React from 'react';
import TradingChampionship from './TradingChampionship';

/**
 * The main index page component for the application.
 *
 * This component serves as the entry point for the root URL ('/'). Its sole
 * purpose is to render the `TradingChampionship` component, which contains the
 * full landing page for the event.
 *
 * @returns {JSX.Element} The TradingChampionship page component.
 */
const Index = () => {
  return <TradingChampionship />;
};

export default Index;

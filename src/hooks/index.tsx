import React from 'react';

import { QuestionsProvider } from './questions'

const AppContext: React.FC = ({ children }) => {
  return (
    <QuestionsProvider>
      {children}
    </QuestionsProvider>
  );
}

export default AppContext;
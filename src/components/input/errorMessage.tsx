import React from 'react';
import { ErrorIconComponent } from '../svgs/error';

export const ErrorMessageComponent: React.FC<{ messages: string[]; className?: string }> = ({
  messages,
  className = ''
}) => {
  return (
    <div className="min-h-5 mt-1 mb-1">
      <div className={`${className} error`} style={{ display: messages.length > 0 ? '' : 'none' }}>
        <ErrorIconComponent fillColor="#c76e77" />
        <p>{messages[0]}</p>
      </div>
    </div>
  );
};

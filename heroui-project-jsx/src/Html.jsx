import React from 'react';

const Html = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>HeroUI Chat - App</title>
      </head>
      <body className="h-full min-h-screen">
        <div id="root">{children}</div>
        <script src="https://cdn.jsdelivr.net/npm/heroui-chat-script@0/dist/index.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/heroui-chat-script@beta/dist/select-and-edit-utils.global.js"></script>
      </body>
    </html>
  );
};

export default Html;

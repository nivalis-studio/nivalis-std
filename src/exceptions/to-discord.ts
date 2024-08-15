import { ensureIsArray } from '../arrays';

export const toDiscord = (err: {
  traceId: string;
  cause: { message: string };
  name: string;
  stack: string | string[];
  status: string;
  message: string;
}) => {
  return [
    {
      color: 16_711_680, // Red color
      fields: [
        {
          inline: true,
          name: 'Trace ID',
          value: err.traceId,
        },
        {
          inline: true,
          name: 'Cause',
          value: err.cause ? err.cause.message : 'N/A',
        },
        {
          inline: true,
          name: 'Name',
          value: err.name,
        },
        {
          inline: false,
          name: 'Stack Trace',
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          value: `\`\`\`${err.stack ? ensureIsArray(err.stack).join('').slice(0, 1014) : 'N/A'}\`\`\``,
        },
      ],
      footer: {
        text: `Logged at: ${new Date().toISOString()}`,
      },
      title: `[${err.status}] ${err.message}`,
    },
  ];
};

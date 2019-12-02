import { HandlebarsAdapter } from '@nest-modules/mailer';
import * as path from 'path';

export default {
  transport:
    process.env.MAILGUN,
  defaults: {
    from: '"Simple Note" <no-replay@simplenote.becoder.com.br>',
  },
  template: {
    dir: path.resolve('templates'),
    adapter: new HandlebarsAdapter(), // or new PugAdapter()
    options: {
      strict: true,
    },
  },
};

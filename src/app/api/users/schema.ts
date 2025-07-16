import { email, object, string } from 'zod';

const schema = object({
  name: string().min(3),
  password: string().min(3),
  email: email(),
});

export default schema;

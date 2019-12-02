import fetch from 'isomorphic-unfetch';
import { IUserLoggedIn, IUserRegistered } from '../../../utils/interfaces/interfaces';

export default async (req, res) => {
  const { email, password } = await req.body;
  const url = `${process.env.BACKEND_URL}/auth/register`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    if (response.ok) {
      const userData: IUserRegistered = await response.json();
      return res.status(200).json(userData);
    } else {
      // https://github.com/developit/unfetch#caveats
      const error: any = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  } catch (error) {
    const { response } = error;
    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(400).json({ message: error.message });
  }
};

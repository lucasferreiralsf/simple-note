import fetch from 'isomorphic-unfetch';
import { IUserLoggedIn } from '../../../utils/interfaces/interfaces';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = await req.query;
  const url = `${process.env.BACKEND_URL}/auth/login`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    if (response.ok) {
      const userData: IUserLoggedIn = await response.json();
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

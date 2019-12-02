import fetch from 'isomorphic-unfetch';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if (!('authorization' in req.headers)) {
    return res.status(401).send('Authorization header missing')
  }

  const token = await req.headers.authorization
  try {
    // if (!token) {
    //   return res.status(401).send('Authorization header missing');
    // }
    const { body, method, query } = await req;
    const url = query.nid ? `${process.env.BACKEND_URL}/notes/${query.nid}` : `${process.env.BACKEND_URL}/notes?perPage=1000`;

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      method: method ? method : 'GET',
      body: body ? body : null
    });

    if (response.ok) {
      const data = await response.json();
      // Need camelcase in the frontend
      // const data = Object.assign({}, { avatarUrl: js.avatar_url }, js);
      return await res.status(200).json(data);
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

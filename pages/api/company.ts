import type { VercelRequest, VercelResponse } from '@vercel/node';

const CLEARBIT_API_KEY = process.env.CLEARBIT_API_KEY


export default (request: VercelRequest, response: VercelResponse) => {
    
  const { name } = request.query;


  if (!name) {
    response.status(404).send({
        message: "Please specify a company name."
    })
  }

  const CLEARBIT_ENDPOINT = `https://company.clearbit.com/v1/domains/find?name=${name}`


    return (fetch(CLEARBIT_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${CLEARBIT_API_KEY}`,
            "Content-Type": "application/json",
        }
    }).then((resp) => {
        return resp.json();
    }).then((json) => {
        return response.status(200).json(json);
    }).catch((err) => {
        return response.status(404).json({error: err})
    }));
};

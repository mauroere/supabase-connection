import mercadopago from 'mercadopago';

mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_ACCESS_TOKEN);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
    return res.status(500).json({ error: 'Mercado Pago access token is not configured.' });
  }

  try {
    const { items, orderId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty. Cannot create payment preference.' });
    }

    const preference = {
      items: items.map(item => ({
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: 'USD',
      })),
      external_reference: orderId,
      back_urls: {
        success: `${process.env.BASE_URL}/success`,
        failure: `${process.env.BASE_URL}/failure`,
        pending: `${process.env.BASE_URL}/pending`,
      },
      auto_return: 'approved',
    };

    const response = await mercadopago.preferences.create(preference);
    res.status(200).json({ init_point: response.body.init_point });
  } catch (error) {
    console.error('Error creating Mercado Pago preference:', error);
    res.status(500).json({ error: 'Failed to create payment preference' });
  }
}

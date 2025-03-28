// src/controllers/webhookController.js
import { Order } from "../models/Order";

export const handlePaymentNotification = async (req, res) => {
  try {
    const { transaction } = req.body;

    // 1. Validação básica
    if (!transaction || !transaction.id) {
      return res.status(400).json({ error: "Dados de transação inválidos" });
    }

    // 2. Encontrar o pedido no banco de dados
    const order = await Order.findOne({ 
      'payment.transactionId': transaction.id 
    });

    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    // 3. Atualizar status com base na notificação
    let newStatus;
    switch (transaction.status) {
      case 'paid':
        newStatus = 'processing';
        break;
      case 'processing':
        newStatus = 'payment_received';
        break;
      case 'waiting_payment': // Para boleto
        newStatus = 'pending_payment';
        break;
      case 'refused':
      case 'chargedback':
        newStatus = 'payment_failed';
        break;
      case 'refunded':
        newStatus = 'refunded';
        break;
      default:
        newStatus = order.status;
    }

    // 4. Atualizar o pedido
    order.status = newStatus;
    order.payment.status = transaction.status;
    order.updatedAt = new Date();

    await order.save();

    // 5. Registrar no log (opcional)
    console.log(`Pedido ${order._id} atualizado para status: ${newStatus}`);

    // 6. Responder ao webhook
    res.status(200).json({ 
      success: true,
      orderId: order._id,
      newStatus 
    });

  } catch (error) {
    console.error("Erro no webhook:", error);
    res.status(500).json({ 
      error: "Erro interno ao processar webhook",
      details: error.message 
    });
  }
};
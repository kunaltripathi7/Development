package VendingMachineRevision;

public class CashPaymentStrategy implements PaymentStrategy {

    @Override
    public boolean processPayment(int amount) {
        // Logic for cash payment processing
        return true;
    }
}

package VendingMachineRevision;

public interface PaymentStrategy {
    boolean processPayment(int amount);
}

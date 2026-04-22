package VendingMachineRevision;

import VendingMachineRevision.enums.Coin;

public class PaymentPendingState implements VendingMachineState {

    @Override
    public void selectItem(VendingMachine machine, int code, int count) {
        System.out.println("Item already selected. Please insert money or cancel.");
    }

    @Override
    public void insertCoin(VendingMachine machine, Coin coin) {
        machine.addCoin(coin);
        int balance = machine.getCurrentBalance();
        int totalPrice = machine.getTotalPrice();

        System.out.println("Inserted ₹" + coin.getValue() + " | Balance: ₹" + balance + " / ₹" + totalPrice);

        if (balance >= totalPrice) {
            System.out.println("Payment complete!");
            machine.setState(new DispenseState());
            machine.dispense();
        }
    }

    @Override
    public void cancel(VendingMachine machine) {
        System.out.println("Transaction cancelled. Refunding ₹" + machine.getCurrentBalance());
        machine.resetTransaction();
        machine.setState(new ReadyState());
    }

    @Override
    public void dispense(VendingMachine machine) {
        System.out.println("Payment not complete yet.");
    }
}

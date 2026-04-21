package VendingMachineRevision;

import VendingMachineRevision.enums.Coin;

public class PaymentPendingState implements VendingMachineState {

    @Override
    public void selectItem(VendingMachine machine, int code) {
        System.out.println("Item is already selected. Please insert money or cancel the transaction.");
    }

    @Override
    public void insertCoin(VendingMachine machine, Coin coin) {
        machine.getCoins().add(coin);
        int currentBalance = machine.getCurrentBalance();
        ItemShelf shelf = machine.getInventory().getShelf(machine.getSelectedItemCode());
        
        System.out.println("Inserted ₹" + coin.getValue() + ". Total: ₹" + currentBalance + " / ₹" + shelf.getPrice());
        
        if (currentBalance >= shelf.getPrice()) {
            System.out.println("Sufficient funds inserted!");
            machine.setState(new DispenseState());
            machine.dispense(); // Auto-dispense since balance is met
        }
    }

    @Override
    public void cancel(VendingMachine machine) {
        System.out.println("Transaction cancelled. Refunding ₹" + machine.getCurrentBalance() + " in coins.");
        machine.getCoins().clear();
        machine.setSelectedItemCode(-1);
        machine.setState(new ReadyState());
    }

    @Override
    public void dispense(VendingMachine machine) {
        System.out.println("Insufficient funds to dispense product.");
    }
}

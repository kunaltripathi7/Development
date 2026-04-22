package VendingMachineRevision;

import VendingMachineRevision.enums.Coin;

public interface VendingMachineState {
    void selectItem(VendingMachine machine, int code, int count);
    void insertCoin(VendingMachine machine, Coin coin);
    void cancel(VendingMachine machine);
    void dispense(VendingMachine machine);
}

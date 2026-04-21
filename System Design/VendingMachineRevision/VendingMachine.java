package VendingMachineRevision;

import VendingMachineRevision.enums.Coin;

import java.util.ArrayList;
import java.util.List;

public class VendingMachine {
    private Inventory inventory;
    private VendingMachineState currentState;
    private List<Coin> coins;
    private int selectedItemCode;

    public VendingMachine() {
        this.inventory = new Inventory(10); // Standard capacity
        this.currentState = new ReadyState();
        this.coins = new ArrayList<>();
        this.selectedItemCode = -1;
    }

    public Inventory getInventory() { return inventory; }
    public VendingMachineState getState() { return currentState; }
    public void setState(VendingMachineState state) { this.currentState = state; }
    public List<Coin> getCoins() { return coins; }
    public int getSelectedItemCode() { return selectedItemCode; }
    public void setSelectedItemCode(int code) { this.selectedItemCode = code; }

    public int getCurrentBalance() {
        return coins.stream().mapToInt(Coin::getValue).sum();
    }

    // Delegation to state objects
    public void selectItem(int code) { currentState.selectItem(this, code); }
    public void insertCoin(Coin coin) { currentState.insertCoin(this, coin); }
    public void cancel() { currentState.cancel(this); }
    public void dispense() { currentState.dispense(this); }
}

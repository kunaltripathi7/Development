package VendingMachineRevision;

import VendingMachineRevision.enums.Coin;

import java.util.ArrayList;
import java.util.List;

public class VendingMachine {
    private final Inventory inventory;
    private VendingMachineState currentState;
    private final List<Coin> coins;
    private int selectedItemCode;
    private int selectedCount;

    public VendingMachine() {
        this.inventory = new Inventory(10);
        this.currentState = new ReadyState();
        this.coins = new ArrayList<>();
        this.selectedItemCode = -1;
        this.selectedCount = 0;
    }

    // --- Delegation to current state (public API for Main/Controller) ---
    public void selectItem(int code, int count) { currentState.selectItem(this, code, count); }
    public void insertCoin(Coin coin) { currentState.insertCoin(this, coin); }
    public void cancel() { currentState.cancel(this); }
    public void dispense() { currentState.dispense(this); }

    // --- Behavioral methods (used by State classes instead of raw getters) ---
    public void setState(VendingMachineState state) { this.currentState = state; }

    public void addCoin(Coin coin) { coins.add(coin); }

    public int getCurrentBalance() {
        return coins.stream().mapToInt(Coin::getValue).sum();
    }

    public void storeSelection(int code, int count) {
        this.selectedItemCode = code;
        this.selectedCount = count;
    }

    public int getTotalPrice() {
        ItemShelf shelf = inventory.getShelf(selectedItemCode);
        return shelf.peek().getPrice() * selectedCount;
    }

    public void resetTransaction() {
        coins.clear();
        selectedItemCode = -1;
        selectedCount = 0;
    }

    // --- Read-only accessors (states need to read context data) ---
    public Inventory getInventory() { return inventory; }
    public int getSelectedItemCode() { return selectedItemCode; }
    public int getSelectedCount() { return selectedCount; }
}

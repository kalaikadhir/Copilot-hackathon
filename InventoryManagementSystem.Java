
import java.util.HashMap;
import java.util.Map;

public class InventoryManagementSystem {
    private Map<String, Integer> inventory;

    public InventoryManagementSystem() {
        this.inventory = new HashMap<>();
    }

    public void addProduct(String productName, int quantity) {
        if (quantity <= 0) {
            System.out.println("Quantity must be greater than zero.");
            return;
        }

        if (inventory.containsKey(productName)) {
            int currentQuantity = inventory.get(productName);
            inventory.put(productName, currentQuantity + quantity);
        } else {
            inventory.put(productName, quantity);
        }

        System.out.println("Product added successfully.");
    }

    public void updateProduct(String productName, int quantity) {
        if (quantity <= 0) {
            System.out.println("Quantity must be greater than zero.");
            return;
        }

        if (inventory.containsKey(productName)) {
            inventory.put(productName, quantity);
            System.out.println("Product updated successfully.");
        } else {
            System.out.println("Product not found.");
        }
    }

    public void removeProduct(String productName) {
        if (inventory.containsKey(productName)) {
            inventory.remove(productName);
            System.out.println("Product removed successfully.");
        } else {
            System.out.println("Product not found.");
        }
    }

    public int checkStock(String productName) {
        if (inventory.containsKey(productName)) {
            return inventory.get(productName);
        } else {
            return 0;
        }
    }

    public static void main(String[] args) {
        InventoryManagementSystem inventorySystem = new InventoryManagementSystem();
        inventorySystem.addProduct("Shirt", 10);
        inventorySystem.updateProduct("Shirt", 15);
        inventorySystem.removeProduct("Pants");

        int stock = inventorySystem.checkStock("Shirt");
        System.out.println("Available stock: " + stock);
    }
}

           

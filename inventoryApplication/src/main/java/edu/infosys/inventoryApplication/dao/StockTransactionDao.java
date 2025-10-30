package edu.infosys.inventoryApplication.dao;

import java.util.List;

import edu.infosys.inventoryApplication.bean.ProductSales;
import edu.infosys.inventoryApplication.bean.StockTransaction;

public interface StockTransactionDao {
	
	public void save(StockTransaction transaction);
	public StockTransaction findStockTransactionById(Long id);
	public Long generateId();
	public List<StockTransaction> showAllTransaction();
	public List<StockTransaction> findTransactionsByType(String type);
	public void removeTransactionById(Long id);
	public void update(StockTransaction transaction);
	public List<ProductSales> getProductWiseTotalSale();
	public List<Double> getDemandByProduct(String productId);
	
}

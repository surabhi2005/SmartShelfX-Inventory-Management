package edu.infosys.inventoryApplication.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import edu.infosys.inventoryApplication.bean.ProductSales;
import edu.infosys.inventoryApplication.bean.StockTransaction;

public interface StockTransactionRepository extends JpaRepository<StockTransaction,Long>{
	
	@Query("select max(transactionId) from StockTransaction")
	public Long findMaxTransactionId();
	
	@Query("select a from StockTransaction a where transactionType=?1 ")
	public List<StockTransaction> findTransactionsByType(String type);
	
	@Query("SELECT new edu.infosys.inventoryApplication.bean.ProductSales(p.productName, SUM(s.transactionValue)) " +
	           "FROM Product p JOIN StockTransaction s ON p.productId = s.productId " +
	           "WHERE s.transactionType='OUT' GROUP BY p.productId ")
	 public List<ProductSales> getProductWiseTotalSale();
	
	@Query("SELECT s.transactionValue from StockTransaction s WHERE s.transactionType='OUT' and productId=?1")
	 public List<Double> getDemandByProduct(String productId);
	

}

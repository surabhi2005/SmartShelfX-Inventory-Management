package edu.infosys.inventoryApplication.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.inventoryApplication.bean.ProductSales;
import edu.infosys.inventoryApplication.bean.StockTransaction;
import edu.infosys.inventoryApplication.dao.StockTransactionDao;

@RestController
@RequestMapping("/inventory/")
@CrossOrigin(origins = "http://localhost:3838")
public class StockTransactionController {
	
	@Autowired
	private StockTransactionDao transactionDao;
	
	@PostMapping("/stock")
	public void save(@RequestBody StockTransaction transaction) {
		transactionDao.save(transaction);
	}
    @GetMapping("/stock/{id}")
	public StockTransaction findStockTransactionById(@PathVariable Long id) {
		return transactionDao.findStockTransactionById(id);
	}
    @GetMapping("/trans/{type}")
	public List<StockTransaction> findTransactionsByType(@PathVariable String type) {
		return transactionDao.findTransactionsByType(type);
	}
    
    @DeleteMapping("/stock/{id}")
	public void removeTransactionById(@PathVariable Long id) {
    	transactionDao.removeTransactionById(id);
	}
	@GetMapping("/stock")
	public List<StockTransaction> showAllTransaction() {
		return transactionDao.showAllTransaction();
	}
	@PutMapping("/stock")
	public void update(@RequestBody StockTransaction transaction)
	{
		transactionDao.save(transaction);
	}
	@GetMapping("/trans")
	public Long generateId() {
	  return transactionDao.generateId();
	  
	}
	@GetMapping("/analysis")
	public Map<String,Double> getProductWiseTotalSale() {
		List<ProductSales> salesList=transactionDao.getProductWiseTotalSale();
		Map<String,Double> salesMap=new HashMap<String,Double>();
		for(ProductSales ps:salesList)
			{
			      salesMap.put(ps.getProductName(),ps.getTotalSalesValue());
			}
		return salesMap;
	}
	@GetMapping("/analysis/{id}")
	public List<Double> getDemandByProduct(@PathVariable String id) {
		return transactionDao.getDemandByProduct(id);
	}

}

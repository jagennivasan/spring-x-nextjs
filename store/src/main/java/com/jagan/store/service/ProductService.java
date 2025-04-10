package com.jagan.store.service;

import com.jagan.store.model.Product;
import com.jagan.store.repo.ProductRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepo repo;

    public ProductService(ProductRepo repo){
    this.repo = repo;
    }

    public List<Product> getAllProduct(){
        return repo.findAll();
    }

    public void addProduct(Product prod) {
        repo.save(prod);
    }

    public Product getProductById(String id) {

        return repo.findById(id).orElse(new Product());
    }
}

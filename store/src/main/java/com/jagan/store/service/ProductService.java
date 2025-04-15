package com.jagan.store.service;

import com.jagan.store.model.Product;
import com.jagan.store.repo.ProductRepo;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

 

    public Product getProductById(String id) {

        return repo.findById(id).orElse(new Product());
    }

    public Product addProduct(Product product, MultipartFile imageFile) throws IOException {
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageData(imageFile.getBytes());

        return  repo.save(product);
    }


}

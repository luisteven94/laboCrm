package com.crm.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crm.model.Usuario;

public interface IUsuarioRepo  extends JpaRepository<Usuario, Integer> {

 	Usuario findOneByUsername(String username);
}

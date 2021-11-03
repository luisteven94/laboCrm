package com.crm.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crm.model.ResetToken;

public interface IResetTokenRepo extends JpaRepository<ResetToken, Long> {
	
 	ResetToken findByToken(String token);

}

package com.crm.service;

import com.crm.model.ResetToken;

public interface IResetTokenService{

	ResetToken findByToken(String token);
	
	void guardar(ResetToken token);
	
	void eliminar(ResetToken token);

}

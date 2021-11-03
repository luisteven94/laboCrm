package com.crm.service.impl;

import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.crm.model.Consulta;
import com.crm.repo.IConsultaRepo;
import com.crm.service.IConsultaService;

import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class ConsultaServiceImpl implements IConsultaService{

	@Autowired	
	private IConsultaRepo repo;
	
  	
	@Transactional
	@Override
	public Consulta registrarTransaccional(Consulta consulta) {
	 		return repo.save(consulta);
	}

	
	@Override
	public Consulta registrar(Consulta obj) {
 
		/*for(DetalleConsulta det : obj.getDetalleConsulta()) {
			det.setConsulta(obj);
		}*/
		return repo.save(obj);		
	}

	@Override
	public Consulta modificar(Consulta obj) {
		return repo.save(obj);
	}

	@Override
	public List<Consulta> listar() { 
		return repo.findAll();
	}

	@Override
	public Consulta leerPorId(Integer id) {
		return repo.findOne(id);
	}

	@Override
	public void eliminar(Integer id) {
		repo.delete(id);
	}

  
 
 


}

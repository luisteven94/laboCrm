package com.crm.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.crm.exception.ModelNotFoundException;
import com.crm.model.Consulta;
import com.crm.model.Mentor;
import com.crm.service.IConsultaService;
import com.crm.service.IMentorService;

@RestController
@RequestMapping("/mentor")
public class MentorController {

	@Autowired
	private IMentorService service;
	
	
	@GetMapping	
	public ResponseEntity<List<Mentor>> listar(){
		List<Mentor> lista = service.listar();
		return new ResponseEntity<List<Mentor>>(lista, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Object> registrar(@Valid @RequestBody Mentor obj) {
		Mentor mentor = service.registrarTransaccional(obj);
	
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(mentor.getIdMentor()).toUri();
		return ResponseEntity.created(location).build();
	}

	 

	@PostMapping("/buscar")
	public ResponseEntity<List<Mentor>> buscar(@RequestBody Mentor filtro) {
		List<Mentor> mentores = new ArrayList<>();
		mentores = service.buscar(filtro);
	 	
		return new ResponseEntity<List<Mentor>>(mentores, HttpStatus.OK);
	}
}

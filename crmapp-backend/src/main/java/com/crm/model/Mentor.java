package com.crm.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "mentor")
public class Mentor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idMentor;

	@Column(name = "nombres", length = 50)
	private String nombres;

	@Column(name = "telefono", length = 20)
	private String telefono;

	@Column(name = "correo", length = 50)
	private String correo;
 
	
	@Column(name = "perfil", length = 100)
	private String perfil;


	public Integer getIdMentor() {
		return idMentor;
	}


	public void setIdMentor(Integer idMentor) {
		this.idMentor = idMentor;
	}


	public String getNombres() {
		return nombres;
	}


	public void setNombres(String nombres) {
		this.nombres = nombres;
	}


	public String getTelefono() {
		return telefono;
	}


	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}


	public String getCorreo() {
		return correo;
	}


	public void setCorreo(String correo) {
		this.correo = correo;
	}


	public String getPerfil() {
		return perfil;
	}


	public void setPerfil(String perfil) {
		this.perfil = perfil;
	}
	
	 
}

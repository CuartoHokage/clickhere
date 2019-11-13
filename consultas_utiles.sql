-- Consultar el stock de almacen matriz para publicar en la pagina
/****** Script para el comando SelectTopNRows de SSMS  ******/
SELECT TOP 1000 [PUBIDENTI]
      ,[PRDCODIGO]
      ,[PUBIDUBIC]
      ,[PUBSTOCK]
      ,[PUBESTADO]
  FROM [click_new].[dbo].[REL_PRODUBIC] where PUBIDUBIC=12 and PUBSTOCK>0

-- selecciona los productos con su imagen donde la imagen tenga el mismo codigo de producto (un producto puede tener varias imagenes)
SELECT top 5 p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN, i.IDENTIFICADOR FROM MAE_PRODUCTO p, IMAGENPROD i WHERE p.PRDIDENTI= i.IDPRODUCTO AND i.IDPRODUCTO=p.PRDIDENTI

SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IDENTIFICADOR, i.IDPRODUCTO FROM MAE_PRODUCTO p inner join IMAGENPROD i on i.IDPRODUCTO=p.PRDIDENTI --modo 2

-- Consulta de producto, stock existente en almacen matriz, con imagen (un producto puede tener varias imagenes)

SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IDENTIFICADOR, i.IDPRODUCTO, r.PUBSTOCK FROM MAE_PRODUCTO p 
inner join IMAGENPROD i on i.IDPRODUCTO=p.PRDIDENTI 
inner join REL_PRODUBIC r on r.PRDCODIGO=p.PRDIDENTI where PUBIDUBIC=12 and PUBSTOCK>0;

-- Consulta de producto con stock
SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, r.PUBSTOCK FROM MAE_PRODUCTO p 
inner join REL_PRODUBIC r on r.PRDCODIGO=p.PRDIDENTI where PUBIDUBIC=12 and PUBSTOCK>0;


--consultar por inicio descripcion de producto
SELECT *  
FROM MAE_PRODUCTO
WHERE PRDNOMBRE LIKE 'PORT%'

--- consultar por la descripcion de los en la barra de busqueda
select p.PRDIDENTI, p.PRDNOMBRE, s.PUBSTOCK from MAE_PRODUCTO p
INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO
inner join REL_PRODAGRUPACION a on p.PRDIDENTI=a.IDPRODUCTO 
where PRDNOMBRE like '%epson%' and PUBSTOCK >0

-- consultar producto con categoria stock y ubicacion
select p.PRDIDENTI, ra.IDPRODUCTO, p.PRDNOMBRE, a.NOMBRE, s.PUBSTOCK, p.PRDPVP from MAE_PRODUCTO p
inner join REL_PRODAGRUPACION ra on ra.IDPRODUCTO= p.PRDIDENTI
inner join AGRUPACION a on ra.IDGRUPO= a.IDGRUPO
INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO and s.PRDCODIGO=p.PRDIDENTI
inner join MAE_UBICACION u on u.UBIIDENTI= s.PUBIDUBIC
where PUBSTOCK >0 and u.UBIIDENTI=12

-- Consultar categoria y descripcion con union 
select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, null as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO
	where PRDNOMBRE like '%portatil%' and PUBSTOCK >0 and PUBIDUBIC=12 
union
select p.PRDIDENTI, p.PRDNOMBRE, a.NOMBRE, s.PUBSTOCK, p.PRDPVP from MAE_PRODUCTO p
inner join REL_PRODAGRUPACION ra on ra.IDPRODUCTO= p.PRDIDENTI
inner join AGRUPACION a on ra.IDGRUPO= a.IDGRUPO
INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO and s.PRDCODIGO=p.PRDIDENTI
inner join MAE_UBICACION u on u.UBIIDENTI= s.PUBIDUBIC
where PUBSTOCK >0 and u.UBIIDENTI=12 and a.NOMBRE like '%portatil%'

---- Consulta de busqueda por categoria, marca y descripcion usando UNION
select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, p.PRDNOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO
	where PRDNOMBRE like '%GENERICO%' and PUBSTOCK >0 and PUBIDUBIC=12 
union all
select p.PRDIDENTI, p.PRDNOMBRE, a.NOMBRE, s.PUBSTOCK, p.PRDPVP from MAE_PRODUCTO p
inner join REL_PRODAGRUPACION ra on ra.IDPRODUCTO= p.PRDIDENTI
inner join AGRUPACION a on ra.IDGRUPO= a.IDGRUPO
INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO and s.PRDCODIGO=p.PRDIDENTI
inner join MAE_UBICACION u on u.UBIIDENTI= s.PUBIDUBIC
where PUBSTOCK >0 and u.UBIIDENTI=12 and a.NOMBRE like '%GENERICO%'
union
select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, Marcas.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p
INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO
inner join MARCAS on MARCAS.IDENTIFICADOR= IDMARCA
where Marcas.NOMBRE like '%GENERICO%' and PUBSTOCK >0 and PUBIDUBIC=12 
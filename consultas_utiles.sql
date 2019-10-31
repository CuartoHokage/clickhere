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
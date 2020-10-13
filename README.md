<div align="center">
  <img width="50%" src="https://www.mrsoft.by/images/header/logo_mrsoft.svg" />
</div>

<h1 align="center">Тестовое задание</h1>

<p>Сделать страницу, на которой будет:</p>

<ul>
  <li>поле для ввода;</li>
  <li>checkbox;</li>
  <li>две кнопки;</li>
  <li>место для вывода данных.</li>
</ul>

<p>Одна кнопка - фильтр по длине слов, вторая кнопка - фильтр по подстроке.
Checkbox отвечает за чувствительность регистра поиска.</p>

<p>При вводе в поле числа и клике по кнопке фильтра по длине слов в место для
вывода данных выводятся строки с длиной строки больше введенного числа.</p>

<p>При вводе строки в поле и клике по кнопке фильтра по подстроке в место для
вывода данных выводятся строки, которые содержат введенную подстроку.</p>

<p>Если checkbox чувствительности регистра проставлен, строки сравниваются с
учетом регистра (&#39;aAa&#39; не равно &#39;aaa&#39;). Если checkbox снят, строки сравниваются
без учета регистра (&#39;aAa&#39; равно &#39;aaa&#39;).</p>

<p>Данные берутся HTTP запросом по адресу <a href="http://www.mrsoft.by/data.json">http://www.mrsoft.by/data.json</a>, из поля
data полученного объекта. Файл с течением суток не меняется.</p>

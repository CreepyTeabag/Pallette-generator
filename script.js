"use strict";
const generatePallette = function (
  dark,
  medium,
  light,
  identifier = "#my-pallette"
) {
  const [h900, s900, l900] = dark;
  const [h500, s500, l500] = medium;
  const [h100, s100, l100] = light;

  const h700 = calculateAverage(h900, h500);
  const h300 = calculateAverage(h500, h100);
  const h800 = calculateAverage(h900, h700);
  const h600 = calculateAverage(h700, h500);
  const h400 = calculateAverage(h500, h300);
  const h200 = calculateAverage(h300, h100);

  const s700 = calculateAverage(s900, s500);
  const s300 = calculateAverage(s500, s100);
  const s800 = calculateAverage(s900, s700);
  const s600 = calculateAverage(s700, s500);
  const s400 = calculateAverage(s500, s300);
  const s200 = calculateAverage(s300, s100);

  const l700 = calculateAverage(l900, l500);
  const l300 = calculateAverage(l500, l100);
  const l800 = calculateAverage(l900, l700);
  const l600 = calculateAverage(l700, l500);
  const l400 = calculateAverage(l500, l300);
  const l200 = calculateAverage(l300, l100);

  const result = `
  <p>--${identifier}900: hsl(${h900}, ${s900}%, ${l900}%);</p>
  <p>--${identifier}800: hsl(${h800}, ${s800}%, ${l800}%);</p>
  <p>--${identifier}700: hsl(${h700}, ${s700}%, ${l700}%);</p>
  <p>--${identifier}600: hsl(${h600}, ${s600}%, ${l600}%);</p>
  <p>--${identifier}500: hsl(${h500}, ${s500}%, ${l500}%);</p>
  <p>--${identifier}400: hsl(${h400}, ${s400}%, ${l400}%);</p>
  <p>--${identifier}300: hsl(${h300}, ${s300}%, ${l300}%);</p>
  <p>--${identifier}200: hsl(${h200}, ${s200}%, ${l200}%);</p>
  <p>--${identifier}100: hsl(${h100}, ${s100}%, ${l100}%);</p>`;
  {
    /* <br>
  ${identifier}_9 {<br>
   background-color: hsl(${h900}, ${s900}%, ${l900}%);<br>
  }<br>
  ${identifier}_8 {<br>
   background-color: hsl(${h800}, ${s800}%, ${l800}%);<br>
  }<br>
  ${identifier}_7 {<br>
   background-color: hsl(${h700}, ${s700}%, ${l700}%);<br>
  }<br>
  ${identifier}_6 {<br>
   background-color: hsl(${h600}, ${s600}%, ${l600}%);<br>
  }<br>
  ${identifier}_5 {<br>
   background-color: hsl(${h500}, ${s500}%, ${l500}%);<br>
  }<br>
  ${identifier}_4 {<br>
   background-color: hsl(${h400}, ${s400}%, ${l400}%);<br>
  }<br>
  ${identifier}_3 {<br>
   background-color: hsl(${h300}, ${s300}%, ${l300}%);<br>
  }<br>
  ${identifier}_2 {<br>
   background-color: hsl(${h200}, ${s200}%, ${l200}%);<br>
  }<br>
  ${identifier}_1 {<br>
   background-color: hsl(${h100}, ${s100}%, ${l100}%);<br>
  }<br>
  `;
  console.log(result); */
  }
  showOutput(
    result,
    h900,
    s900,
    l900,
    h800,
    s800,
    l800,
    h700,
    s700,
    l700,
    h600,
    s600,
    l600,
    h500,
    s500,
    l500,
    h400,
    s400,
    l400,
    h300,
    s300,
    l300,
    h200,
    s200,
    l200,
    h100,
    s100,
    l100
  );
  return result;
};

const calculateAverage = function (n1, n2) {
  return Math.round((+n1 + +n2) / 2);
};

const showValue = function (element) {
  const value = element.value;
  document.getElementById(`${element.id}Value`).innerHTML = value;

  const hue = +document.getElementById("hue").value;
  const saturation = +document.getElementById("saturation").value;
  const lightness = +document.getElementById("lightness").value;

  document.querySelector(
    ".color-picker"
  ).style.backgroundColor = `hsl(${hue},${saturation}%,${lightness}%)`;
  document.querySelectorAll(".range-wrapper").forEach((div) => {
    div.style.backgroundColor = `hsl(${hue},${saturation}%,${lightness}%)`;
    div.style.color = `hsl(${100 - hue}, ${100 - saturation}%, ${
      100 - lightness
    }%)`;
  });
};

const createPallette = function () {
  const formEl = document.forms.createPalletteForm;
  const formData = new FormData(formEl);
  const fullData = Object.fromEntries(formData);
  const {
    hue_pallette_dark,
    saturation_pallette_dark,
    lightness_pallette_dark,
    hue_pallette_medium,
    saturation_pallette_medium,
    lightness_pallette_medium,
    hue_pallette_light,
    saturation_pallette_light,
    lightness_pallette_light,
    var_name,
  } = { ...fullData };

  if (Object.values(fullData).indexOf("") > -1) {
    alert("Fill in all fields of the form!");
    return;
  }

  generatePallette(
    [hue_pallette_dark, saturation_pallette_dark, lightness_pallette_dark],
    [
      hue_pallette_medium,
      saturation_pallette_medium,
      lightness_pallette_medium,
    ],
    [hue_pallette_light, saturation_pallette_light, lightness_pallette_light],
    var_name
  );
};

const setColor = function (btn) {
  const type = btn.slice(7);
  const formEl = document.forms.colorPickerForm;
  const formData = new FormData(formEl);
  const fullData = Object.fromEntries(formData);
  const { hue, saturation, lightness } = { ...fullData };

  document.getElementById(`hue_pallette_${type}`).value = hue;
  document.getElementById(`saturation_pallette_${type}`).value = saturation;
  document.getElementById(`lightness_pallette_${type}`).value = lightness;

  document
    .getElementById(`hue_pallette_${type}`)
    .closest(
      ".row"
    ).style.backgroundColor = `hsl(${hue},${saturation}%,${lightness}%)`;
};

const showOutput = function (
  text,
  h900,
  s900,
  l900,
  h800,
  s800,
  l800,
  h700,
  s700,
  l700,
  h600,
  s600,
  l600,
  h500,
  s500,
  l500,
  h400,
  s400,
  l400,
  h300,
  s300,
  l300,
  h200,
  s200,
  l200,
  h100,
  s100,
  l100
) {
  const outputEl = document.querySelector(".output");
  outputEl.classList.remove("d-none");
  outputEl.innerHTML = text;
  outputEl.style.background = `linear-gradient(to bottom,
    hsl(${h900}, ${s900}%, ${l900}%) 0%, hsl(${h900}, ${s900}%, ${l900}%) 11.111%, 
    hsl(${h800}, ${s800}%, ${l800}%) 11.111%, hsl(${h800}, ${s800}%, ${l800}%) 22.222%,
    hsl(${h700}, ${s700}%, ${l700}%) 22.222%, hsl(${h700}, ${s700}%, ${l700}%) 33.333%,
    hsl(${h600}, ${s600}%, ${l600}%) 33.333%, hsl(${h600}, ${s600}%, ${l600}%) 44.444%,
    hsl(${h500}, ${s500}%, ${l500}%) 44.444%, hsl(${h500}, ${s500}%, ${l500}%) 55.555%,
    hsl(${h400}, ${s400}%, ${l400}%) 55.555%, hsl(${h400}, ${s400}%, ${l400}%) 66.666%,
    hsl(${h300}, ${s300}%, ${l300}%) 66.666%, hsl(${h300}, ${s300}%, ${l300}%) 77.777%,
    hsl(${h200}, ${s200}%, ${l200}%) 77.777%, hsl(${h200}, ${s200}%, ${l200}%) 88.888%,
    hsl(${h100}, ${s100}%, ${l100}%) 88.888%, hsl(${h100}, ${s100}%, ${l100}%) 100%
  )`;

  const paragraphs = outputEl.querySelectorAll("p");
  if (h900 !== h100 || s900 !== s100 || l900 !== l100) {
    paragraphs[4].style.color = `hsl(${h900}, ${s900}%, ${l900}%)`;
    paragraphs[5].style.color = `hsl(${h800}, ${s800}%, ${l800}%)`;
    paragraphs[6].style.color = `hsl(${h700}, ${s700}%, ${l700}%)`;
    paragraphs[7].style.color = `hsl(${h600}, ${s600}%, ${l600}%)`;
    paragraphs[8].style.color = `hsl(${h500}, ${s500}%, ${l500}%)`;
    paragraphs[0].style.color = `hsl(${h400}, ${s400}%, ${l400}%)`;
    paragraphs[1].style.color = `hsl(${h300}, ${s300}%, ${l300}%)`;
    paragraphs[2].style.color = `hsl(${h200}, ${s200}%, ${l200}%)`;
    paragraphs[3].style.color = `hsl(${h100}, ${s100}%, ${l100}%)`;
  } else {
    paragraphs.forEach(
      (p) =>
        (p.style.color = `hsl(${180 - h100}, ${100 - s100}%, ${100 - l100}%)`)
    );
  }
};

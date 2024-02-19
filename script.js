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
  ${identifier}_9 {
   background-color: hsl(${h900}, ${s900}%, ${l900}%);
  }
  ${identifier}_8 {
   background-color: hsl(${h800}, ${s800}%, ${l800}%);
  }
  ${identifier}_7 {
   background-color: hsl(${h700}, ${s700}%, ${l700}%);
  }
  ${identifier}_6 {
   background-color: hsl(${h600}, ${s600}%, ${l600}%);
  }
  ${identifier}_5 {
   background-color: hsl(${h500}, ${s500}%, ${l500}%);
  }
  ${identifier}_4 {
   background-color: hsl(${h400}, ${s400}%, ${l400}%);
  }
  ${identifier}_3 {
   background-color: hsl(${h300}, ${s300}%, ${l300}%);
  }
  ${identifier}_2 {
   background-color: hsl(${h200}, ${s200}%, ${l200}%);
  }
  ${identifier}_1 {
   background-color: hsl(${h100}, ${s100}%, ${l100}%);
  }
  `;

  console.log(result);
  return result;
};

const calculateAverage = function (n1, n2) {
  return Math.round((+n1 + +n2) / 2);
};

// generatePallette([342, 70, 28], [342, 50, 50], [342, 70, 95], "#pink");

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
    [hue_pallette_light, saturation_pallette_light, lightness_pallette_light]
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
};

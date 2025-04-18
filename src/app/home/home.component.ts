import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { HtmlPreviewComponent } from "../html-preview/html-preview.component";

@Component({
  selector: "app-home",
  imports: [HtmlPreviewComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  htmlContent: string = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Opensense Business Card</title>
    <link href="https://cdn.jsdelivr.net/npm/@tailwindcss/forms@2.x/dist/tailwindforms.min.css" rel="stylesheet"> 
</head>
<body>

<div class="container mx-auto py-8">
  <div class="bg-white rounded-lg shadow-lg p-6">
    <div class="flex items-center justify-center h-full">
      <img src="https://via.placeholder.com/200" alt="Opensense logo" class="w-16 mb-4">
    </div>

    <h1 class="text-3xl font-bold text-gray-800">Opensense</h1>
    <p class="mt-4 text-lg leading-tight text-gray-600">Your company tagline goes here</p>
    </div>
</div>

<script src="https://cdn.tailwindcss.com"></script> 


</body>
</html>
  `;
}

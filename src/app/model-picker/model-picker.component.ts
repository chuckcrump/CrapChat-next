import { Component, signal } from '@angular/core';
import { PreviewStateService } from '../../preview.service';
import { NgFor } from '@angular/common';
import  ollama  from 'ollama';

@Component({
  selector: 'app-model-picker',
  imports: [NgFor],
  templateUrl: './model-picker.component.html',
  styleUrl: './model-picker.component.css'
})
export class ModelPickerComponent {
  models = signal<any[]>([])
  constructor(private modelState: PreviewStateService) {}

  async ngOnInit() {
    const modelsRes = await ollama.list();
    this.models.set(modelsRes.models.map((model: any) => model.name));
  }
  
  setModel(name: string) {
    this.modelState.setCurrentModel(name);
  }
}

// import { Component, OnInit } from '@angular/core';
// import { InventoryService } from '../../services/inventoryService/inventory.service';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-inventory',
//   templateUrl: './inventory.component.html',
//   styleUrls: ['./inventory.component.css'],
//   imports: [CommonModule, ReactiveFormsModule]
// })
// export class InventoryComponent implements OnInit {
//   inventoryForm!: FormGroup;
//   inventories: any[] = [];
//   isEditMode = false;
//   selectedItemId: number | null = null;

//   constructor(
//     private inventoryService: InventoryService,
//     private fb: FormBuilder
//   ) {}

//   ngOnInit(): void {
//     this.loadInventory();
//     this.inventoryForm = this.fb.group({
//       itemName: ['', [Validators.required, Validators.maxLength(100)]],
//       quantity: [1, [Validators.required, Validators.min(1)]],
//       price: [0, [Validators.required, Validators.min(1)]],
//       departmentId: [null, Validators.required],
//     });
//   }

//   loadInventory(): void {
//     this.inventoryService.getAllInventory().subscribe(
//       (data) => {
//         this.inventories = data;
//       },
//       (error) => {
//         console.error('Error fetching inventory:', error);
//       }
//     );
//   }

//   onSubmit(): void {
//     console.log('Form submitted!');
//     if (this.inventoryForm.invalid) {
//       return;
//     }
//     if (this.isEditMode && this.selectedItemId) {
//       this.updateInventory(this.selectedItemId);
//     } else {
//       this.createInventory();
//     }
//   }

//   createInventory(): void {
//     this.inventoryService.createInventory(this.inventoryForm.value).subscribe(
//       (data) => {
//         this.loadInventory();
//         this.resetForm();
//       },
//       (error) => {
//         console.error('Error creating inventory:', error);
//       }
//     );
//   }

//   updateInventory(id: number): void {
//     this.inventoryService.updateInventory(id, this.inventoryForm.value).subscribe(
//       (data) => {
//         this.loadInventory();
//         this.resetForm();
//       },
//       (error) => {
//         console.error('Error updating inventory:', error);
//       }
//     );
//   }

//   onEdit(item: any): void {
//     this.isEditMode = true;
//     this.selectedItemId = item.inventoryId;
//     this.inventoryForm.patchValue(item);
//   }

//   onDelete(id: number): void {
//     if (confirm('Are you sure you want to delete this item?')) {
//       this.inventoryService.deleteInventory(id).subscribe(
//         () => {
//           this.loadInventory();
//         },
//         (error) => {
//           console.error('Error deleting inventory:', error);
//         }
//       );
//     }
//   }

//   resetForm(): void {
//     this.inventoryForm.reset();
//     this.isEditMode = false;
//     this.selectedItemId = null;
//   }
// }

import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventoryService/inventory.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  inventoryForm!: FormGroup;
  inventories: any[] = [];
  isEditMode = false;
  selectedItemId: number | null = null;

  constructor(
    private inventoryService: InventoryService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadInventory();
    this.inventoryForm = this.fb.group({
      itemName: ['', [Validators.required, Validators.maxLength(100)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(1)]],
      departmentName: ['', Validators.required]  
    });
  }

  loadInventory(): void {
    this.inventoryService.getAllInventory().subscribe(data => {
      this.inventories = data;
    });
  }

  onSubmit(): void {
    if (this.inventoryForm.invalid) return;

    const itemData = this.inventoryForm.value;

    if (this.isEditMode && this.selectedItemId !== null) {
      this.inventoryService.updateInventory(this.selectedItemId, itemData).subscribe(() => {
        this.loadInventory();
        this.resetForm();
      });
    } else {
      this.inventoryService.createInventory(itemData).subscribe(() => {
        this.loadInventory();
        this.resetForm();
      });
    }
  }

  onEdit(item: any): void {
    this.isEditMode = true;
    this.selectedItemId = item.inventoryId;
    this.inventoryForm.patchValue(item);
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.inventoryService.deleteInventory(id).subscribe(() => {
        this.loadInventory();
      });
    }
  }

  resetForm(): void {
    this.inventoryForm.reset();
    this.isEditMode = false;
    this.selectedItemId = null;
  }
}

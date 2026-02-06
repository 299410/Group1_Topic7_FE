import { delay, mockResponse } from './index';

export interface RecipeItem {
    materialId: string;
    materialName: string; // Denormalized for display
    quantity: number;
    unit: string;
    costPerUnit: number; // Snapshot of cost
}

export interface Recipe {
    id: string;
    productId: string;
    productName: string;
    items: RecipeItem[];
    instructions: string;
    yield: number; // How many units this recipe produces
    totalCost: number;
    status: 'active' | 'draft' | 'archived';
    lastUpdated: string;
}

const MOCK_RECIPES: Recipe[] = [
    {
        id: 'REC-001',
        productId: '1', // Bê bò bistech đặc biệt
        productName: 'Bê bò bistech đặc biệt',
        items: [
            { materialId: '1', materialName: 'Thịt bò tươi', quantity: 0.25, unit: 'kg', costPerUnit: 250000 },
            { materialId: '2', materialName: 'Sốt tiêu đen', quantity: 0.05, unit: 'lit', costPerUnit: 120000 },
            { materialId: '3', materialName: 'Khoai tây', quantity: 0.15, unit: 'kg', costPerUnit: 30000 }
        ],
        instructions: 'Áp chảo thịt bò đến độ chín mong muốn. Rưới sốt tiêu đen. Phục vụ kèm khoai tây chiên.',
        yield: 1,
        totalCost: 73000,
        status: 'active',
        lastUpdated: '2023-10-25'
    }
];

export const recipeService = {
    getRecipes: async () => {
        await delay(500);
        return mockResponse([...MOCK_RECIPES]);
    },

    getRecipeByProductId: async (productId: string) => {
        await delay(300);
        const recipe = MOCK_RECIPES.find(r => r.productId === productId);
        return mockResponse(recipe || null);
    },

    saveRecipe: async (recipe: Partial<Recipe>) => {
        await delay(800);
        const existingIndex = MOCK_RECIPES.findIndex(r => r.id === recipe.id);

        const savedRecipe = {
            ...recipe,
            id: recipe.id || `REC-${Math.floor(Math.random() * 10000)}`,
            lastUpdated: new Date().toISOString().split('T')[0]
        } as Recipe;

        if (existingIndex !== -1) {
            MOCK_RECIPES[existingIndex] = savedRecipe;
        } else {
            MOCK_RECIPES.push(savedRecipe);
        }
        return mockResponse(savedRecipe);
    },

    calculateCost: (items: RecipeItem[]): number => {
        return items.reduce((total, item) => total + (item.quantity * item.costPerUnit), 0);
    }
};

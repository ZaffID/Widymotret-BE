import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/packages - List all packages
router.get('/', async (req: Request, res: Response) => {
    try {
        res.json({
            success: true,
            data: [],
        });
    } catch (error) {
        console.error('Get packages error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

// GET /api/packages/:id - Get single package
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        res.status(404).json({
            success: false,
            message: `Package with id ${id} not found`,
        });
    } catch (error) {
        console.error('Get package error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

// POST /api/packages - Create package
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, description, price, category, images, features, isPublished } = req.body;

        if (!name || !description || price === undefined || !category) {
            res.status(400).json({
                success: false,
                message: 'name, description, price, and category are required',
            });
            return;
        }

        res.status(201).json({
            success: true,
            message: 'Package created',
            data: { name, description, price, category, images, features, isPublished },
        });
    } catch (error) {
        console.error('Create package error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

// PUT /api/packages/:id - Update package
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        res.json({
            success: true,
            message: `Package ${id} updated`,
            data: { id, ...updates },
        });
    } catch (error) {
        console.error('Update package error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

// DELETE /api/packages/:id - Delete package
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        res.json({
            success: true,
            message: `Package ${id} deleted`,
        });
    } catch (error) {
        console.error('Delete package error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

export default router;

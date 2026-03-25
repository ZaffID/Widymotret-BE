import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/portfolios - List all portfolios (optional ?category= filter)
router.get('/', async (req: Request, res: Response) => {
    try {
        const { category } = req.query;

        res.json({
            success: true,
            data: [],
            ...(category && { filter: { category } }),
        });
    } catch (error) {
        console.error('Get portfolios error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

// GET /api/portfolios/:id - Get single portfolio
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        res.status(404).json({
            success: false,
            message: `Portfolio with id ${id} not found`,
        });
    } catch (error) {
        console.error('Get portfolio error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

// POST /api/portfolios - Create portfolio
router.post('/', async (req: Request, res: Response) => {
    try {
        const { title, description, imageUrl, category } = req.body;

        if (!title || !description || !imageUrl || !category) {
            res.status(400).json({
                success: false,
                message: 'title, description, imageUrl, and category are required',
            });
            return;
        }

        res.status(201).json({
            success: true,
            message: 'Portfolio created',
            data: { title, description, imageUrl, category },
        });
    } catch (error) {
        console.error('Create portfolio error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

// PUT /api/portfolios/:id - Update portfolio
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        res.json({
            success: true,
            message: `Portfolio ${id} updated`,
            data: { id, ...updates },
        });
    } catch (error) {
        console.error('Update portfolio error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

// DELETE /api/portfolios/:id - Delete portfolio
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        res.json({
            success: true,
            message: `Portfolio ${id} deleted`,
        });
    } catch (error) {
        console.error('Delete portfolio error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

export default router;

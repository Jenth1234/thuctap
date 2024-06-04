
const { createCommentValidate } = require('../../models/comment/validate/index');
const Comment = require('../../models/comment/comment.model');
const commentService = require('../../service/comment/comment.service');
class COMMENT_CONTROLLER{
createComment = async (req, res) => {
    try {
        const payload = req.body;
        const { error } = createCommentValidate.validate(payload, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data',
                errors: error.details.map(detail => detail.message)
            });
        }
        const newComment = await commentService.createComment(payload);

        return res.status(201).json({
            success: true,
            message: 'Comment has been created successfully.',
            data: newComment
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        });
    }
};

getCommentsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const comments = await commentService.getCommentsByUser(userId);
        
        return res.status(200).json({
            success: true,
            data: comments
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        });
    }
};
getCommentsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const comments = await commentService.getCommentsByProduct(productId);
        
        return res.status(200).json({
            success: true,
            data: comments
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        });
    }
};


<<<<<<< HEAD
=======
      const { error } = updateCommentValidate.validate({ CONTENT }, { abortEarly: false });
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Dữ liệu không hợp lệ',
          errors: error.details
        });
      }

      const updatedComment = await commentService.updateCommentContent(commentId, CONTENT);

      if (!updatedComment) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy bình luận'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Bình luận đã được cập nhật thành công.',
        data: updatedComment
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi máy chủ nội bộ',
        error: err.message
      });
    }
  };
  deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user_id;
  
    try {
      const response = await commentService.deleteComment(commentId, userId);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
>>>>>>> 4e8faf27985e7bf7614252e0d6bf59e7a5c8a91b
}

module.exports = new COMMENT_CONTROLLER();


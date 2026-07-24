'use client';

import { useState } from 'react';
import { ReviewType } from '@/lib/products';
import { MessageSquarePlus, CheckCircle, Calendar, X, Upload, Trash2 } from 'lucide-react';

interface ProductReviewsProps {
  productId: string;
  initialReviews?: ReviewType[];
  initialRating?: number;
  initialReviewCount?: number;
}

export default function ProductReviews({
  productId,
  initialReviews = [],
  initialRating = 5.0,
  initialReviewCount = 0,
}: ProductReviewsProps) {
  const [reviews, setReviews] = useState<ReviewType[]>(initialReviews);
  const [ratingAvg, setRatingAvg] = useState<number>(initialRating);
  const [reviewCount, setReviewCount] = useState<number>(initialReviewCount || initialReviews.length);

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form State
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [fileName, setFileName] = useState('');

  const handleRatingClick = (selectedStars: number) => {
    setRating(selectedStars);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('Image size should be less than 5MB.');
        return;
      }
      setErrorMsg('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setImageUrl('');
    setFileName('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) {
      setErrorMsg('Please provide your name and a review message.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author,
          rating,
          comment,
          imageUrl: imageUrl.trim() || null,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setSuccessMsg('Thank you! Your review has been published.');
        setReviews([json.data, ...reviews]);
        const updatedCount = reviewCount + 1;
        const updatedSum = reviews.reduce((acc: number, r: ReviewType) => acc + r.rating, 0) + json.data.rating;
        setReviewCount(updatedCount);
        setRatingAvg(Number((updatedSum / updatedCount).toFixed(1)));

        // Reset form
        setAuthor('');
        setComment('');
        setImageUrl('');
        setFileName('');
        setShowForm(false);
      } else {
        throw new Error(json.error || 'Failed to submit review');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Failed to submit review');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="reviews-section">
      {/* Header & Rating Summary */}
      <div className="reviews-header">
        <div>
          <h2 className="reviews-title">
            Customer Reviews & Ratings
          </h2>
          <div className="reviews-summary-wrap">
            <div className="reviews-score-flex">
              <span className="reviews-score-big">{ratingAvg.toFixed(1)}</span>
              <div className="reviews-stars-gold">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`material-symbols-outlined ${i < Math.round(ratingAvg) ? 'detail-star-summary-gold' : 'detail-star-summary-muted'}`}>
                    star
                  </span>
                ))}
              </div>
            </div>
            <span className="reviews-count-label">
              ({reviewCount} {reviewCount === 1 ? 'customer review' : 'customer reviews'})
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary-toyjoy bouncy-btn"
        >
          <MessageSquarePlus className="reviews-alert-icon" />
          <span>{showForm ? 'Cancel Review' : 'Write a Review & Upload Photos'}</span>
        </button>
      </div>

      {successMsg && (
        <div className="reviews-alert-success">
          <CheckCircle className="reviews-alert-icon" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Review Submission Form Drawer */}
      {showForm && (
        <div className="reviews-form-drawer">
          <div className="reviews-form-header">
            <h3 className="reviews-form-title">Share Your Experience with this Toy</h3>
            <button onClick={() => setShowForm(false)} className="reviews-close-btn">
              <X className="reviews-close-icon" />
            </button>
          </div>

          {errorMsg && (
            <div className="reviews-alert-error">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="reviews-form-grid">
              <div>
                <label className="reviews-field-label">Your Name *</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Rahul Sharma"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="reviews-field-label">Select Star Rating *</label>
                <div className="reviews-star-select-row">
                  {[1, 2, 3, 4, 5].map((starNum) => (
                    <button
                      key={starNum}
                      type="button"
                      onClick={() => handleRatingClick(starNum)}
                      className="reviews-star-btn"
                    >
                      <span className={`material-symbols-outlined ${starNum <= rating ? 'detail-star-form-gold' : 'detail-star-form-muted'}`}>
                        star
                      </span>
                    </button>
                  ))}
                  <span className="reviews-star-score-text">
                    {rating} / 5 Stars
                  </span>
                </div>
              </div>
            </div>

            <div className="form-group-mb">
              <label className="reviews-field-label">Review Details / Feedback *</label>
              <textarea
                className="admin-textarea"
                rows={3}
                placeholder="What did you or your kids love about this toy? Is the quality good?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>

            {/* Direct File Upload Input */}
            <div className="reviews-photo-box">
              <label className="reviews-field-label">
                Upload Product Photo (Optional)
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden-input"
                id="review-photo-upload"
              />

              {!imageUrl ? (
                <label
                  htmlFor="review-photo-upload"
                  className="reviews-photo-upload-label bouncy-btn"
                >
                  <Upload className="reviews-upload-icon" />
                  <span>Choose Photo File from Device</span>
                </label>
              ) : (
                <div className="reviews-photo-preview-wrap">
                  <div className="reviews-photo-preview-frame">
                    <img src={imageUrl} alt="Selected photo preview" className="reviews-photo-preview-img" />
                  </div>
                  <div>
                    <p className="reviews-photo-filename">{fileName || 'Photo attached'}</p>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="reviews-photo-remove-btn"
                    >
                      <Trash2 className="reviews-trash-icon" />
                      <span>Remove Photo</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="reviews-form-actions">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="reviews-cancel-btn bouncy-btn"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary-toyjoy bouncy-btn"
              >
                {submitting ? 'Submitting Review...' : 'Submit Customer Review'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Customer Reviews List */}
      {reviews.length === 0 ? (
        <div className="reviews-empty-state">
          <p className="reviews-empty-title">No customer reviews yet for this toy.</p>
          <p className="reviews-empty-subtitle">Be the first to share your rating and upload photos!</p>
        </div>
      ) : (
        <div className="reviews-list">
          {reviews.map((rev) => (
            <div key={rev.id} className="review-card">
              <div className="review-card-header">
                <div className="review-author-wrap">
                  <div className="review-author-avatar">
                    {rev.author ? rev.author.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h4 className="review-author-name">
                      <span>{rev.author}</span>
                      <span className="review-badge-verified">
                        Verified Buyer
                      </span>
                    </h4>
                    <span className="review-date-text">
                      <Calendar className="reviews-cal-icon" />
                      <span>{new Date(rev.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </span>
                  </div>
                </div>

                <div className="reviews-stars-gold">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`material-symbols-outlined ${i < rev.rating ? 'detail-star-gold' : 'detail-star-muted'}`}>
                      star
                    </span>
                  ))}
                </div>
              </div>

              <p className="review-comment-text">
                {rev.comment}
              </p>

              {/* Review Photo Attachment */}
              {rev.imageUrl && (
                <div className="review-photo-attach-frame">
                  <img
                    src={rev.imageUrl}
                    alt={`${rev.author}'s photo`}
                    className="review-photo-attach-img"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

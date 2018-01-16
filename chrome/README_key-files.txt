Code for inserting the comment better button into pages.
Here are just the core pages:


extension/
  1. Starts with one of these:
  inject.js = chrome extension, injects button into facebook
  inject-something.js = injects button into comments on something (eg. Drupal)

  2. Loads the modal here. We might experiment with different flavors,
    getting feedback:
  CbbModal.js

assets/
  better_comment.css theme the 
  bccModal.css  theme the modal



* A bit of renaming and reordering makes sense.

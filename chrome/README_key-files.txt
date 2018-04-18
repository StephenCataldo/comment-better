Code for inserting the comment better button into pages.
Here are just the core pages:

extension/inject.js      
    Injects into your facebook pages, inserting the CBB into the comment
    boxes.
    import CbbModal from './CbbModal';
extension/CbbModal.js
    Creates the tabs and provides content when you click a CBB.
    Eventually we'd like to separate this further,
    so the content and code are not in one file. It's already at a point
    that an adventuresome non-techy editor could hopefully edit the content.
assets/    (loaded by the manifest!)
  cbbModal.css themes the modal.
  better_comment.css I believe themes the CBB (the button, not the modal)

OTHER

Different injectors can start different versions. In /extension:
  inject.js = chrome extension, injects button into facebook
  inject-something.js = injects button into comments on something (eg. Drupal)

manifest.dev.json: This is the file that loads the chrome extension created
  into the /dev folder
manifest.prod.json:   
  into the /build folder

     


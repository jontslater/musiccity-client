import { Button } from 'bootstrap';

function ReactionCard({ reactionObj }) {
  return (

    <Button variant="danger" onClick={deleteThisBook} className="m-2">
      DELETE
    </Button>
  );
}

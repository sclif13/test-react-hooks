import * as React from "react";

const TextArea = ({ log }) => <textarea rows="6" value={log} readOnly={true} />;

export default React.memo(TextArea);

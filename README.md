# Rclone GUI experiment

This is a GUI experiment for rclone.

Don't get excited it doesn't do anything useful yet and may never :-)

See also bootstrap branch.

See also: [react docs](/react.md).

## How to develop

Run the rclone rcd server in one window

    rclone rcd -v --rc-no-auth --rc-serve

Run this one one window

    npm start

## How to run not in development

Run

    npm run build

Then

    rclone rcd -v --rc-no-auth --rc-serve --rc-files build
